import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

export default function PostCard2({ $id, title, featuredImage,content }) {
    const excerpt=content.substring(0,30);
  return (
    <Link to={`/post/${$id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={title}
          height="100"
          image={appwriteService.getFilePreview(featuredImage)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {excerpt}...
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Link>
  );
}
