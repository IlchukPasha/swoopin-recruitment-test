import VehicleService from 'services/vehicle'

const VehiclesRoute = async (server : any, opts : any, next: () => void) => {
  server.route({
    method: 'GET',
    url: '/vehicles',
    preHandler: server.auth([server.authenticateAccount]),
    async handler(req: any, res: any) {
      res.code(200).send(VehicleService.getVehicles())
    },
  })

  server.route({
    method: 'POST',
    url: '/vehicles/online/:vehicleId',
    preHandler: server.auth([server.authenticateAccount]),
    async handler(req: any, res: any) {
      const { vehicleId } = req.params

      VehicleService.changeVehicleOnline(vehicleId, true)

      res.code(200).send({})
    },
  })

  server.route({
    method: 'POST',
    url: '/vehicles/offline/:vehicleId',
    preHandler: server.auth([server.authenticateAccount]),
    async handler(req: any, res: any) {
      const { vehicleId } = req.params

      VehicleService.changeVehicleOnline(vehicleId, false)

      res.code(200).send({})
    },
  })

  next()
}

export default VehiclesRoute
