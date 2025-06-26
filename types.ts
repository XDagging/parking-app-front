export type ToastType = {
    isWarning: boolean;
    message: string;

}


export type ParkingStatus = {
    isOpen: boolean;
    minutesAvailable: number;
    availableSpot?: string;
    url?: string;


}
export type Coordinate = {
    latitude: number,
    longitude: number
}

export type IntervalType = ReturnType<typeof setInterval>

export interface AlertType extends ToastType {}