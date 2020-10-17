import Orphanage from '../models/Orphanage';
import ImagesView from '../views/ImagesView';

export default {
    Render(orphanage: Orphanage){
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            image: ImagesView.RenderMany(orphanage.images)
        }
    },
    RenderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.Render(orphanage))
    }
}