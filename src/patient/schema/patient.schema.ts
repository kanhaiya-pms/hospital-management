import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { eRole } from "src/utils/interface";

export type PatientDocument = HydratedDocument<Patient>;

@Schema({versionKey: false, timestamps: true})
export class Patient {
    @Prop({type: String, required: true})
    first_name: string

    @Prop({type: String, required: false, default: ""})
    last_name: string

    @Prop({type: Number, required: true})
    age: number

    @Prop({type: String, required: true})
    mobile: string

    @Prop({type: String, required: true, lowercase: true, unique: true})
    email: string

    @Prop({type: String, required: true})
    password: string

    @Prop({type: String, required: false, unique: true, default: ""})
    username: string

    @Prop()
    dp: string

    @Prop({default: null})
    otp: number

    @Prop({default: eRole.PATIENT, required: false})
    role: eRole
}

export const PatientSchema = SchemaFactory.createForClass(Patient)