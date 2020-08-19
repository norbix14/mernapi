const { validationResult } = require('express-validator')
const Proyecto = require('../../models/proyecto/')

exports.crearProyecto = async (req, res) => {
	const errores = validationResult(req)
	if(!errores.isEmpty()) {
		return res.status(400).json({
			errores: errores.array()
		})
	}
	try {
		const proyecto = new Proyecto(req.body)
		proyecto.creador = req.usuario.id
		await proyecto.save()
		res.json({
			msg: 'Proyecto creado correctamente',
			proyecto
		})
	} catch(e) {
		console.log('Hubo un error al crear el proyecto')
		res.status(500).json({
			msg: 'Hubo un error al crear el proyecto' 
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
		res.json({
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
	const errores = validationResult(req)
	if(!errores.isEmpty()) {
		return res.json({
			errores: errores.array()
		})
	}
	const proyectoId = req.params.id
	try {
		let proyecto = await Proyecto.findById(proyectoId)
		if(!proyecto) {
			return res.json({
				msg: 'Este proyecto no existe'
			})
		}
		if(proyecto.creador.toString() !== req.usuario.id) {
			return res.json({
				msg: 'No autorizado'
			})
		}
		const { nombre } = req.body
		const nuevoProyecto = {}
		nuevoProyecto.nombre = nombre ? nombre : ''
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
		res.json({
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
	const proyectoId = req.params.id
	try {
		let proyecto = await Proyecto.findById(proyectoId)
		if(!proyecto) {
			return res.json({
				msg: 'Este proyecto no existe'
			})
		}
		if(proyecto.creador.toString() !== req.usuario.id) {
			return res.json({
				msg: 'No autorizado'
			})
		}
		await Proyecto.findOneAndRemove({ _id: proyectoId })
		res.json({
			msg: 'Proyecto eliminado correctamente'
		})
	} catch(e) {
		console.log('Error al intentar eliminar un proyecto')
		res.status(500).json({
			msg: 'Error al intentar eliminar un proyecto'
		})
	}
}
