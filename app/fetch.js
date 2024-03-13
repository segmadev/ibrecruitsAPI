import  {FILEROOT}  from "./const.js";
import { Database } from "./database.js";
export class Fetch extends Database {
    async getBlogs({limit}) {
        let blogs = await this.getall({table: 'posts', select: 'id, title, description, created_at', where: `id != ? order by created_at DESC LIMIT ${limit}`, data: [""] });
        blogs = await this.handleMedia({data: blogs, collection_name: "posts"});
        return blogs;
        // return await this.getall({table: 'posts as p inner join media as m on p.id = m.model_id', select: 'p.id, p.title, p.description, p.created_at, m.id, m.model_id, m.collection_name, m.file_name', where: `m.collection_name = ? order by p.created_at DESC LIMIT ${limit}`, data: ["posts"] });
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
}

// fetch blogs


// fetch sliders

// fetch about

// 