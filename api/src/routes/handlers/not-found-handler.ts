const notFoundHandler = (req: any, res: any) => {
  res.status(404).send({
    statusCode: 404,
    error: 'api endpoint not found',
    message: 'not_found',
  })
}

export default notFoundHandler
