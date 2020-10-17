import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import OrphanagesView from '../views/OrphanagesView';
import * as Yup from 'yup';
import { array, number, object, string } from 'yup';

export default {

    async index(request: Request, response: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(OrphanagesView.RenderMany(orphanages));
    },

    async show(request: Request, response: Response){
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(OrphanagesView.Render(orphanage));
    },

    async create(request: Request, response: Response){
        const{
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: string().required(),
            latitude: number().required(),
            longitude: number().required(),
            about: string().required().max(300),
            instructions: string().required().max(300),
            opening_hours: string().required(),
            open_on_weekends: string().required(),
            images: array(
                object().shape({
                    path: string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false
        });
    
        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);
    
        response.status(201).json({orphanage});
    }
}