const { validationResult } = require('express-validator')
const Tarea = require('../../models/tarea/')
const Proyecto = require('../../models/proyecto/')

exports.crearTarea = async (req, res) => {
	const errores = validationResult(req)
	if(!errores.isEmpty()) {
		return res.status(400).json({
			errores: errores.array()
		})
	}
	try {
		const { proyecto } = req.body
		const proyectoEncontrado = await Proyecto.findById(proyecto)
		if(!proyectoEncontrado) {
			return res.json({
				msg: 'Este proyecto no existe'
			})
		}
		if(proyectoEncontrado.creador.toString() !== req.usuario.id) {
			return res.json({
				msg: 'No autorizado'
			})
		}
		const tarea = new Tarea(req.body)
		await tarea.save()
		res.json({
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
		const { proyecto } = req.body
		const proyectoEncontrado = await Proyecto.findById(proyecto)
		if(!proyectoEncontrado) {
			return res.json({
				msg: 'Este proyecto no existe'
			})
		}
		if(proyectoEncontrado.creador.toString() !== req.usuario.id) {
			return res.json({
				msg: 'No autorizado'
			})
		}
		const tareas = await Tarea.find({proyecto})
		res.json({
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
	const tareaId = req.params.id
	try {
		let tarea = await Tarea.findById(tareaId)
		if(!tarea) {
			return res.json({
				msg: 'Esta tarea no existe'
			})
		}
		const { estado, nombre, proyecto } = req.body
		const proyectoEncontrado = await Proyecto.findById(proyecto)
		if(proyectoEncontrado.creador.toString() !== req.usuario.id) {
			return res.json({
				msg: 'No autorizado'
			})
		}
		const nuevaTarea = {}
		nuevaTarea.nombre = nombre ? nombre : ''
		nuevaTarea.estado = estado ? estado : false
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
		res.json({
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
	const tareaId = req.params.id
	try {
		let tarea = await Tarea.findById(tareaId)
		if(!tarea) {
			return res.json({
				msg: 'Esta tarea no existe'
			})
		}
		const { proyecto } = req.body
		const proyectoEncontrado = await Proyecto.findById(proyecto)
		if(proyectoEncontrado.creador.toString() !== req.usuario.id) {
			return res.json({
				msg: 'No autorizado'
			})
		}
		await Tarea.findOneAndRemove({ _id: tareaId })
		res.json({
			msg: 'Tarea eliminada correctamente'
		})
	} catch(e) {
		console.log('No se ha podido eliminar la tarea')
		res.status(500).json({
			msg: 'No se ha podido eliminar la tarea'
		})
	}
}
