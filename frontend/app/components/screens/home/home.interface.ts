import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { ISlide } from '@/components/ui/slider/slider.interface';

export interface IHome {
	slides: ISlide[];
	movies: IGalleryItem[];
	actors: IGalleryItem[];
}
