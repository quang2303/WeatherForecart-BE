import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import axios from 'axios'

interface ForecastDay {
  date: string
  day: {
    avgtemp_c: number
    avghumidity: number
    maxwind_mph: number
    condition: {
      text: string
      icon: string
    }
  }
}

const api = 'http://api.weatherapi.com/v1/'
const apiKey = '9a7dd846fa2b4544bc5234018242704'

console.log(api, apiKey)

export const weatherInfo = async (req: any, res: Response) => {
  const { location } = req.query
  const days = 5
  const apiUrl = `${api}forecast.json?key=${apiKey}&q=${location}&days=${days}&aqi=no&alerts=no`
  try {
    const response = await axios.get(apiUrl)
    const weatherData = response.data
    const forecastData = weatherData.forecast?.forecastday
    if (!forecastData) {
      throw new Error('No forecast data available')
    }
    const forecastInfo = forecastData.map((day: ForecastDay) => {
      return {
        date: day.date,
        avgtempC: day.day.avgtemp_c,
        avghumidity: day.day.avghumidity,
        maxwindMph: day.day.maxwind_mph,
        conditionText: day.day.condition.text,
        conditionIcon: day.day.condition.icon
      }
    })
    return res.status(StatusCodes.OK).send({ location, forecastInfo })
  } catch (err) {
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: 'Something went wrong, please try later.' })
  }
}
