import { Request, Response, NextFunction } from 'express';

export type Route = (req: Request, res: Response, next: NextFunction) => void;

interface ICoordinate {
    lon: number;
    lat: number;
}
interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}
interface IWeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}
interface IWeatherWind {
    speed: number;
    deg: number;
    gust: number;
}
interface IWeatherSys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface IWeatherResponse {
    coord: ICoordinate;
    weather: IWeather[];
    base: string;
    main: IWeatherMain;
    visibility: number;
    wind: IWeatherWind;
    clouds: {
        all: number;
    };
    dt: number;
    sys: IWeatherSys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export type WeatherStringType = (res: IWeatherResponse, lang: string | undefined, icon: string | undefined) => string;

interface IWeatherAttribute {
    token?: string;
    city?: string;
    language?: string;
}

type IconFunctionType = (icon: string) => string | undefined;
type WeatherFunctionType = (atts: IWeatherAttribute, options?: IWeatherAttribute) => Promise<IWeatherResponse>;
