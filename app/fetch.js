import  {FILEROOT}  from "./const.js";
import { Database } from "./database.js";
export class Fetch extends Database {
    async getBlogs({limit}) {
        let blogs = await this.getall({table: 'posts', select: 'id, title, description, created_at', where: `id != ? order by created_at DESC LIMIT ${limit}`, data: [""] });
        blogs = await this.handleMedia({data: blogs, collection_name: "posts"});
        return blogs;
    }

    async getSliders() {
        let sliders = await this.getall({ select: "id, description", table: "image_sliders", where: "is_active = ?", data: [1] });
        sliders = await this.handleMedia({data: sliders, collection_name: "image-sliders"});
         return sliders;
    }
    async getTestimonials() {
        let testimonials = await this.getall({ select: "id, customer_name, description", table: "testimonials", where: "id != ? order by created_at", data: [""]});
        testimonials = await this.handleMedia({data: testimonials, collection_name: "testimonials"});
         return testimonials;
    }

    // get all services 
    async getServices() {
        let services = await this.getall({ select: "id, name, description", table: "services"});
        services = await this.handleMedia({data: services, collection_name: "services"});
         return services;
    }
    async getService({id}) {
        let services = await this.getall({ select: "id, name, description", table: "services", where: "id = ?", data: [id]});
        services = await this.handleMedia({data: services, collection_name: "services"});
         return services;
    }

    async getSettings() {
        const data = ["default_country_code", "enable_google_recaptcha", "google_plus_url", "privacy_policy", "terms_conditions", "region_code"];
        var info = await this.getall({table: "settings", select: "`key`, `value`", where: "`key` != ? and `key` != ? and `key` != ? and `key` != ? and `key` != ? and `key` != ?", data})
        return this.cleanSettingsData({data: info});
    }
    async fastGetData({table, select = "*", collection_name = null}){
        collection_name = collection_name != null ? collection_name :  table
        let data = await this.getall({ select, table});
        data = await this.handleMedia({data, collection_name});
        return data;
    }

    async handleMedia({data, collection_name}) {
        if(data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                data[i].img = await this.getMedia({id: data[i].id, collection_name})
            }
         }
         return data;
    }

    async getMedia({id, collection_name}) {
        // get the post media
        let path;
        let media = await this.getall({select: 'id, model_id, collection_name, file_name', table: 'media', where: 'model_id = ? and collection_name = ? LIMIT 1', data: [id, collection_name], fetch: 's'});
        media && media.id != "" ? path = FILEROOT+'/uploads/'+media.collection_name+'/'+media.id+'/'+media.file_name : path = "";
        return path
    }

    cleanSettingsData({data}) {
       let info = [{}];
        if(data.length > 0){
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if(element.key == "footer_logo" || element.key == "logo"){
                    // element.value = element.value.includes("http://localhost/") ? element.value.replace("http://localhost/", "") : element.value;
                    // data[i].value = FILEROOT+"/"+element.value;
                }
                info[0][data[i].key] = data[i].value; 
                // info[data[i].key] = data[i].value;
            }
        }
        return info;
    }
    
}