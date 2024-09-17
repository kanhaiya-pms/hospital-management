import { ApiProperty } from "@nestjs/swagger"
import { eRole } from "src/utils/interface"

export class CreatePatientDto {
    @ApiProperty()
    first_name: string

    @ApiProperty()
    last_name?: string

    @ApiProperty()
    age: number

    @ApiProperty()
    mobile: string

    @ApiProperty()
    email: string

    @ApiProperty()
    password: string

    @ApiProperty()
    highest_edu: string[]

    @ApiProperty()
    document: string[]

    // @ApiProperty()
    username?: string

    // @ApiProperty()
    role?: eRole

    otp?: number

    @ApiProperty()
    dp: string
}
