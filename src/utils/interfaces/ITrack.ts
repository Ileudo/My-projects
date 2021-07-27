import { IRenderTrackParams } from './IRenderTrackParams';

export interface ITrack {
  render(obj: IRenderTrackParams): HTMLElement;
}
