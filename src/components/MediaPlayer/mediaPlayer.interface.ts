import { IRadioChannel } from "@/interfaces/radio.interface";

export interface IMediaPlayerProps {
    channel: IRadioChannel
    onChangeChannel: Function
}