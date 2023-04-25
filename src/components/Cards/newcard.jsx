import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

function newsCard(props) {
    const { news } = props;
    function NewsCard(news) {
        return (
            <Card sx={{ width: "33%"}}>
                <CardHeader
                    title={news.title}
                    subheader={news.author}
                    sx = {{
                        height: '200px',
                        overflow: 'auto',
                        '@media screen and (max-width: 1200px)': {
                          height: 'auto',
                          minHeight: '50px',
                        },
                      }}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={news.urlToImage}
                    alt={news.title}
                />
                <CardContent sx={{height: '180px', overflow: 'auto' }}>
                    <Typography variant="body1" color="text.secondary"fontWeight="bold" style={{fontSize:"20px"}}>
                        Source: {news.source.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"style={{fontSize:"20px"}}>
                        Description: {news.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"style={{fontSize:"20px"}}>
                        Published At: {new Date(news.publishedAt).toLocaleDateString()}
                    </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center'}}>
                    <Button  variant="contained" href={news.url} target="_blank">Learn More..</Button>
                </CardActions>
            </Card>
        )
    }

    return (

        <Card style={{ display: "flex", width: '80%', gap: "16px" }} sx={{ maxWidth: '80%' }}>
            {news && news.articles.map((news,index) => <NewsCard key={index} {...news} />)}
        </Card>

    );
}
export default newsCard;