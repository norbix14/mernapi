const Tarea = require('../../models/tarea/')
const Proyecto = require('../../models/proyecto/')

exports.crearTarea = async (req, res) => {
	try {
		const { proyecto } = req.body
		const proyectoEncontrado = await Proyecto.findById(proyecto)
		if(!proyectoEncontrado) {
			return res.status(404).json({
				msg: 'Este proyecto no existe'
			})
		}
		if(proyectoEncontrado.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				msg: 'No autorizado'
			})
		}
		const tarea = new Tarea(req.body)
		await tarea.save()
		res.status(200).json({
			msg: 'Tarea agregada correctamente',
			tarea
		})
	} catch(e) {
		console.log('No se ha podido crear la tarea')
		res.status(500).json({
			msg: 'No se ha podido crear la tarea'
		})
	}
}

exports.obtenerTareas = async (req, res) => {
	try {
		const { proyecto } = req.query
		const proyectoEncontrado = await Proyecto.findById(proyecto)
		if(!proyectoEncontrado) {
			return res.status(404).json({
				msg: 'Este proyecto no existe'
			})
		}
		if(proyectoEncontrado.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				msg: 'No autorizado'
			})
		}
		const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 })
		res.status(200).json({
			msg: 'Estas son las tareas del proyecto',
			tareas
		})
	} catch(e) {
		console.log('No se han podido obtener las tareas')
		res.status(500).json({
			msg: 'No se han podido obtener las tareas'
		})
	}
}

exports.actualizarTarea = async (req, res) => {
	try {
		const tareaId = req.params.id
		let tarea = await Tarea.findById(tareaId)
		if(!tarea) {
			return res.status(404).json({
				msg: 'Esta tarea no existe'
			})
		}
		const { estado, nombre, proyecto } = req.body
		const proyectoEncontrado = await Proyecto.findById(proyecto)
		if(proyectoEncontrado.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				msg: 'No autorizado'
			})
		}
		const nuevaTarea = {}
		nuevaTarea.nombre = nombre || ''
		nuevaTarea.estado = estado || false
		tarea = await Tarea.findOneAndUpdate(
			{
				_id: tareaId
			},
			{
				$set: nuevaTarea
			},
			{
				new: true
			}
		)
		res.status(200).json({
			msg: 'Tarea actualizada correctamente',
			tarea
		})
	} catch(e) {
		console.log('No se ha podido actualizar la tarea')
		res.status(500).json({
			msg: 'No se ha podido actualizar la tarea'
		})
	}
}

exports.eliminarTarea = async (req, res) => {
	try {
		const tareaId = req.params.id
		let tarea = await Tarea.findById(tareaId)
		if(!tarea) {
			return res.status(404).json({
				msg: 'Esta tarea no existe'
			})
		}
		const { proyecto } = req.query
		const proyectoEncontrado = await Proyecto.findById(proyecto)
		if(proyectoEncontrado.creador.toString() !== req.usuario.id) {
			return res.status(401).json({
				msg: 'No autorizado'
			})
		}
		await Tarea.findOneAndRemove({ _id: tareaId })
		res.status(200).json({
			msg: 'Tarea eliminada correctamente'
		})
	} catch(e) {
		console.log('No se ha podido eliminar la tarea')
		res.status(500).json({
			msg: 'No se ha podido eliminar la tarea'
		})
	}
}
