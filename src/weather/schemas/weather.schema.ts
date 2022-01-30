import * as mongoose from 'mongoose';

export const WeatherSchema = new mongoose.Schema({
    selectedDate:String,
    description:String,
    tempraratue:String
});