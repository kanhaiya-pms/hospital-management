import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { eRole } from "src/utils/interface";

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
export class Doctor {
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

    @Prop({type: [String], required: true})
    highest_edu: string[]

    @Prop({type: [String], required: true})
    document: string[]

    @Prop({type: String, required: false, unique: true, default: ""})
    username: string

    @Prop()
    dp: string

    @Prop({default: eRole.DOCTOR, required: false})
    role: eRole
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor)