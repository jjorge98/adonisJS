import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Moment from 'App/Models/Moment'
import { v4 as uuidv4 } from 'uuid'

export default class MomentsController {
  private validationOptions = {
    size: '2mb',
    extnames: ['jpg', 'png'],
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const image = request.file('image', this.validationOptions)

    const codeResponse = {}

    if (image) {
      if (!image.isValid) {
        let errorString = ''

        for (let error of image.errors) {
          errorString += error.message + ' - '
        }

        errorString = errorString.substring(0, errorString.length - 3)

        codeResponse['imgError'] = errorString
        codeResponse['imgResponse'] = 'Image was not uploaded'
      } else {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        })

        body.image = imageName
      }
    }

    const moment = await Moment.create({
      title: body.title,
      description: body.description,
      image: body.image,
    })

    response.status(201)

    codeResponse['message'] = 'Moment created with success'
    codeResponse['data'] = moment

    return codeResponse
  }

  public async index() {
    const moments = await Moment.query().preload('comments')

    return { data: moments }
  }

  public async show({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)

    await moment.load('comments')

    return { data: moment }
  }

  public async destroy({ params }: HttpContextContract) {
    const moment = await Moment.findOrFail(params.id)

    await moment.delete()

    return {
      message: 'Moment deleted with success',
      data: moment,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const moment = await Moment.findOrFail(params.id)

    const image = request.file('image', this.validationOptions)

    const codeResponse = {}

    if (image) {
      if (!image.isValid) {
        let errorString = ''

        for (let error of image.errors) {
          errorString += error.message + ' - '
        }

        errorString = errorString.substring(0, errorString.length - 3)

        codeResponse['imgError'] = errorString
        codeResponse['imgResponse'] = 'Image was not uploaded'
      } else {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        })

        body.image = imageName
      }
    }

    moment.title = body.title
    moment.description = body.description
    moment.image = body.image

    await moment.save()

    codeResponse['message'] = 'Moment updated with success'
    codeResponse['data'] = moment

    return codeResponse
  }
}
