import { BehaviorSubject } from 'rxjs';
import { ProfilePictureFrame } from './interfaces';
import { DEFAULT_FRAME } from './consts';

export const activeFrame: BehaviorSubject<ProfilePictureFrame> = new BehaviorSubject<ProfilePictureFrame>(DEFAULT_FRAME);
export const imageLoaded: BehaviorSubject<null> = new BehaviorSubject<null>(null);