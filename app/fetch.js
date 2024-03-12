import { Database } from "./database.js";

export class Fetch extends Database {
    async getBlogs({limit}) {
        return await this.getall({table: 'posts', select: 'title, description, created_at', where: `id != ? order by created_at DESC LIMIT ${limit}`, data: [""] });
    }
}

// fetch blogs


// fetch sliders

// fetch about

// 