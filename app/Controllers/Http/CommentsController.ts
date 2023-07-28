import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Moment'

export default class CommentsController {
  public async store({ params, request, response }: HttpContextContract) {
    const body = request.body()
    const momentId = params.momentId

    const moment = await Moment.findOrFail(momentId)

    const comment = await Comment.create({
      username: body.username,
      text: body.text,
      momentId: moment.id,
    })

    response.status(201)

    return {
      message: 'Comment added with success',
      data: comment,
    }
  }
}
