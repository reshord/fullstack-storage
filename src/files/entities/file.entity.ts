import { UserEntity } from "src/users/entities/user.entity"
import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('files')
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    filename: string

    @Column()
    originalName: string

    @Column()
    size: number

    @Column()
    minetype: string

    @ManyToOne(() => UserEntity, (user) => user.files)
    user: UserEntity[]

    @DeleteDateColumn()
    deletedAt?: Date
}
