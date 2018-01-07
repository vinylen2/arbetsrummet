import { Material } from './material.model';
import { Author } from './author.model';
import { Subject } from './subject.model';

export class Assignment {
    id: number;
    title: string;
    description: string;
    courseWorkType: string;
    createdAt: Date;
    authors: Author[];
    materials: Material[];
    subjects: Subject[];
}