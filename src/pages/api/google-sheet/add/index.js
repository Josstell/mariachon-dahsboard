import { callApiGoogleSheet } from '../../../../helpers/index'

const { SPREADSHEET_ID_MARIACHON_LOCAL_TEST, SHEET_ID } = process.env

const handlerGoogle = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed' })
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const date = new Date()

  const dateOfEvent = new Date(req.body.dateOfEvent)

  if (req.method === 'POST') {
    try {
      const { sheet } = await callApiGoogleSheet(
        SPREADSHEET_ID_MARIACHON_LOCAL_TEST,
        SHEET_ID
      )

      const clientDetails = {
        fecha_creacion: date.toLocaleDateString('es-MX', options),
        id: req.body.id,
        nombre: req.body.name,
        telefono: req.body.tel,
        email: req.body.email || '',
        fecha: dateOfEvent.toLocaleDateString('es-MX', options),
        hora: req.body.timeOfEvent,
        estado: req.body.region || '',
        ciudad: req.body.city,
      }

      await sheet.addRow(clientDetails)
      return res.status(200).json({
        message: `Reservación ${clientDetails.id} agregada correntamente en google sheet`,
      })
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      })
    }
  }
  return res.status(404).send('Not found')
}

export default handlerGoogle
