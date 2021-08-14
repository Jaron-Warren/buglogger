import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const NoteSchema = new Schema(
  {
    body: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    bugId: { type: Schema.Types.ObjectId, ref: 'Bug', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

NoteSchema.virtual('bug', {
  localField: 'bugId',
  ref: 'Bug',
  foreignField: '_id',
  justOne: true
})
