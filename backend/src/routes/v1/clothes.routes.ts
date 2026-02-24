import { Router } from 'express';
import { clothesController } from '../../controllers/clothes.controller';

const clothesRoutes = Router();

clothesRoutes.get('/', clothesController.getAll);
clothesRoutes.get('/:id', clothesController.getById);
clothesRoutes.post('/', clothesController.create);
clothesRoutes.put('/:id', clothesController.updateById);
clothesRoutes.delete('/:id', clothesController.deleteById);

export default clothesRoutes;