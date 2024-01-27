import express, { json } from 'express';
import { Blog } from '../DB Client/model.js';
import { v4 } from 'uuid';

const blogRoutes = express.Router();

blogRoutes.use(json())

blogRoutes.get("/", async (req, res) => {
    try {
        const blogData = await Blog.find({});
        res.status(200).json(blogData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

blogRoutes.get('/get/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const blog = await Blog.findOne({id});

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

blogRoutes.post("/create", async (req, res) => {
    try {
        const payload = req.body;
        const newBlog = new Blog({ ...payload, id: v4() });
        await newBlog.save();
        res.status(200).json({ success: true, message: 'Blog created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

blogRoutes.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;
        const isBlog = await Blog.findOne({ id })
        if (isBlog) {

            await Blog.updateOne({ id: id }, { $set: payload });

            res.status(200).json({ success: true, message: 'Blog updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
})


blogRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const isBlog = await Blog.findOne({ id: id });

        if (isBlog) {
            await Blog.deleteOne({ id: id });
            res.status(200).json({ success: true, message: 'Blog deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Blog not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
export default blogRoutes;