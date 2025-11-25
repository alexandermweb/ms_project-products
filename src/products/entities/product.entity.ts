import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'products'})
export class Product {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'text'})
  name:string;

  @Column({type:'float', default:0})
  price:number;

  @Index()
  @Column({type:'boolean', default:true})
  available: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt: Date;
}
