import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    title: {
        type: String
    },
    slug: {
        type: String,
        unique: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    active: {
        type: Boolean
    },
}, {
    timestamps: true
});

urlSchema.index({ user: 1 });

const Url = model('url', urlSchema);

export default Url;

export async function createShortUrl(length) {

    async function isShortUrlUnique(shortUrlInput) {
        const count = await Url.countDocuments({ slug: shortUrlInput });
        if (count > 0) {
            return false;
        } else {
            return true;
        };
    };

    do {
        var shortUrl;
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789-+*~<>';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        shortUrl = result;
    } while (!(await isShortUrlUnique(shortUrl)));

    return shortUrl;
};

export async function getUrlsByUser(userId) {
    const allEntries = await Url.find({ user: userId });
    return allEntries;
};

export async function deleteUrlById(urlId) {
    const entry = await Url.findOneAndDelete({ _id: urlId });
    await entry.deleteOne();
};

export async function findUrlBySlug(slug) {
    const entry = await Url.findOne({ slug });
    return entry;
};

export async function findUrlByUrlId(urlId) {
    const entry = await Url.findOne({ _id: urlId });
    return entry;
};