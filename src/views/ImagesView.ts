import Image from '../models/Image';

export default {
    Render(image: Image){
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}`
        }
    },
    RenderMany(images: Image[]){
        return images.map(image => this.Render(image))
    }
}