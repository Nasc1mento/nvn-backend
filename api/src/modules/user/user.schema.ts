import * as bcrypt from 'bcrypt';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Book, BookSchema } from '../book/book.schema';


export interface UserDocument extends User, Document  {
    comparePassword: (password: string) => Promise<boolean>;
}

@Schema()
export class User {
    @Prop({
        unique: true,
        index: true,
        required: true,
    })
    cpf: string;
    @Prop()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) 
            return next();
        
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
        } catch (error) {
            next(error);
        }
    },
);

UserSchema.pre('deleteOne', async function(next) {
    try {
        const id = this.getQuery()['_id'];
        const bookModel = this.model.db.model(Book.name, BookSchema);
        await bookModel.deleteMany({userId: id}); 
    } catch(error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};
