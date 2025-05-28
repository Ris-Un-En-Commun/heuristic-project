import type {CreateParkingSpotDto} from "./create-parking-spot.dto.ts";

export interface UpdateParkingSpotDto extends Partial<CreateParkingSpotDto> {
}
