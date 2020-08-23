const Proyecto = require('../../models/proyecto/')
const Tarea = require('../../models/tarea/')

exports.crearProyecto = async (req, res) => {
	try {
		const proyecto = new Proyecto(req.body)
		proyecto.creador = req.usuario.id
		await proyecto.save()
		res.status(200).json({
			msg: 'Proyecto creado correctamente',
			proyecto
		})
	} catch(e) {
		console.log('Ha ocurrido un error al crear el proyecto')
		res.status(500).json({
			msg: 'Ha ocurrido un error al crear el proyecto' 
		})
	}
}

exports.obtenerProyectos = async (req, res) => {
	try {
		const proyectos = await Proyecto.find({
			creador: req.usuario.id
		}).sort({
			creado: -1
		})
		res.status(200).json({
			msg: 'Estos son tus proyectos',
			proyectos
		})
	} catch(e) {
		console.log('Error al obtener los proyectos')
		res.status(500).json({
			msg: 'Error al obtener los proyectos'
		})
	}
}

exports.actualizarProyecto = async (req, res) => {
	try {
		const proyectoId = req.params.id
		let proyecto = await Proyecto.findById(proyectoId)
		if(!proyecto) {
			return res.status(404).json({
				msg: 'Este proyecto no existe'
			})
		}
		if(proyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				msg: 'No autorizado'
			})
		}
		const { nombre } = req.body
		const nuevoProyecto = {}
		if(nombre) nuevoProyecto.nombre = nombre
		proyecto = await Proyecto.findByIdAndUpdate(
			{
				_id: proyectoId
			},
			{
				$set: nuevoProyecto
			},
			{
				new: true
			}
		)
		res.status(200).json({
			msg: 'Proyecto actualizado correctamente',
			proyecto
		})
	} catch(e) {
		console.log('Error al intentar actualizar un proyecto')
		res.status(500).json({
			msg: 'Error al intentar actualizar un proyecto'
		})
	}
}

exports.eliminarProyecto = async (req, res) => {
	try {
		const proyectoId = req.params.id
		let proyecto = await Proyecto.findById(proyectoId)
		if(!proyecto) {
			return res.status(404).json({
				msg: 'Este proyecto no existe'
			})
		}
		if(proyecto.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				msg: 'No autorizado'
			})
		}
		await Tarea.deleteMany({ proyecto: proyectoId })
		await Proyecto.findOneAndRemove({ _id: proyectoId })
		res.status(200).json({
			msg: 'Proyecto eliminado correctamente'
		})
	} catch(e) {
		console.log('Error al intentar eliminar un proyecto')
		res.status(500).json({
			msg: 'Error al intentar eliminar un proyecto'
		})
	}
}
