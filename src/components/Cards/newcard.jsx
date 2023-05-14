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
            <Card sx={{ flexBasis: 'calc(33% - 2 * 16px)',borderRadius:"25px"}}>
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
                <CardContent sx={{height: '230px', overflow: 'auto' }}>
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

        <Card style={{ display: "flex", flexWrap: "wrap", gap: "16px",maxWidth: '80%' ,borderRadius:"25px",justifyContent: "center", boxShadow:"none", padding:"4px"}} sx={{  }}>
            {news && news.articles.map((news,index) => <NewsCard key={index} {...news} />)}
        </Card>

    );
}
export default newsCard;