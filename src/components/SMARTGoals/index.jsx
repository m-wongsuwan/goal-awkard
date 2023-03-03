import React from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function SMARTGoals() {

    const styles = {
        exampleStyle: {
            p: 1,
            my: 2,
            backgroundColor: 'lightGrey'
        },
        pStyle: {
            my: 1,
            // px: 2,
            display: 'block'
        },
        headingStyle: {
            my: 2
        }
    }

    return (
        <Container maxWidth='md' sx={{mb:3}}>
            <Paper elevation={5} sx={{py:2}}>
                <Box
                    sx={{
                        textAlign: 'left',
                        px:3
                    }}
                >
                    <Typography variant='h3'>
                        How to Write SMART Goals
                    </Typography>
                    <Link 
                        variant="caption" 
                        href="https://www.atlassian.com/blog/productivity/how-to-write-smart-goals"
                        target="_blank"
                        rel="noopener"
                        sx={{ml:1}}
                    >
                        By Kat Boogaard for Atlassian
                    </Link>
                    <br />
                    <Typography sx={styles.pStyle} variant='p'>
                        Meet Jane. She’s a product manager at a mid-sized tech company – let’s call it Techfirm, Inc. Jane has been tasked with increasing usage of Techfirm’s mobile app.
                    </Typography>

                    <Typography sx={styles.pStyle} variant='p'>
                        She knows she’ll need all hands on deck to make this happen, but there’s a problem. When Jane has set team-wide goals in the past, they’ve quickly fallen off track. Nobody seemed to have a clear understanding of what success should look like. Progress wasn’t monitored closely enough. And inevitably, that important objective slipped to the back burner (before toppling off the stove entirely).
                    </Typography>

                    <Typography sx={styles.pStyle} variant='p'>
                        That’s why, this time around, Jane plans to leverage SMART goals for setting an action plan and staying the course.
                    </Typography>
                    
                    <Typography sx={styles.headingStyle} variant='h4'>
                        What are SMART goals?
                    </Typography>
                    <Typography sx={styles.pStyle} variant='p'>
                        The SMART in SMART goals stands for Specific, Measurable, Achievable, Relevant, and Time-Bound.
                    </Typography>

                    <Typography sx={styles.pStyle} variant='p'>
                        Defining these parameters as they pertain to your goal helps ensure that your objectives are attainable within a certain time frame. This approach eliminates generalities and guesswork, sets a clear timeline, and makes it easier to track progress and identify missed milestones.
                    </Typography>

                    <Typography sx={styles.pStyle} variant='p'>
                        An example of a SMART-goal statement might look like this: Our goal is to [quantifiable objective] by [timeframe or deadline]. [Key players or teams] will accomplish this goal by [what steps you’ll take to achieve the goal]. Accomplishing this goal will [result or benefit].
                    </Typography>

                    <Typography sx={styles.headingStyle} variant='h4'>
                        S: Specific
                    </Typography>
                    <Typography sx={styles.pStyle} variant='p'>
                        In order for a goal to be effective, it needs to be specific. A specific goal answers questions like:
                    </Typography>
                    <List sx={{px: 2}}>
                        <ListItem>
                                What needs to be accomplished?
                        </ListItem>
                        <ListItem>
                            Who’s responsible for it?
                        </ListItem>
                        <ListItem>
                            What steps need to be taken to achieve it?
                        </ListItem>

                    </List>
                    <Typography sx={styles.pStyle} variant='p'>
                        Thinking through these questions helps get to the heart of what you’re aiming for. Here’s an example of a specific goal Jane might come up with:
                    </Typography>
                    <Container>
                        <Paper
                            sx={styles.exampleStyle}
                        >
                            SPECIFIC
                            <br />
                            Grow the number of monthly users of Techfirm’s mobile app by optimizing our app-store listing and creating targeted social media campaigns.
                        </Paper>
                    </Container>

                    <Typography sx={styles.headingStyle} variant='h4'>
                        M: Measurable
                    </Typography>
                    <Typography sx={styles.pStyle} variant='p'>
                        Specificity is a solid start, but quantifying your goals (that is, making sure they’re measurable) makes it easier to track progress and know when you’ve reached the finish line.

                        Jane and her product team want to grow the number of their mobile app users – but by how much? If they get even one new signup, that’s technically positive growth – so does that mean they’re done? Same goes for their strategy; how many platforms will they advertise on? 

                        To make this SMART objective more impactful, Jane should incorporate measurable, trackable benchmarks.
                    </Typography>
                    <Container>
                        <Paper
                            sx={styles.exampleStyle}
                        >
                            MEASURABLE
                            <br />
                            Increase the number of monthly users of Techfirm’s mobile app by 1,000 by optimizing our app-store listing and creating targeted social media campaigns for four social media platforms: Facebook, Twitter, Instagram, and LinkedIn.
                        </Paper>
                    </Container>

                    <Typography sx={styles.headingStyle} variant='h4'>
                        A: Achievable
                    </Typography>
                    <Typography sx={styles.pStyle} variant='p'>
                        This is the point in the process when you give yourself a serious reality check. Goals should be realistic — not pedestals from which you inevitably tumble. Ask yourself: is your objective something your team can reasonably accomplish?

                        Jane might look at her goal and realize that, given her small team and their heavy workload, creating ad campaigns for four social platforms might be biting off more than they can chew. She decides to scale back to the three social networks where she’s most likely to find new clients.
                    </Typography>
                    <Container>
                        <Paper
                            sx={styles.exampleStyle}
                        >
                            ACHIEVABLE
                            <br />
                            Increase the number of monthly users of Techfirm’s mobile app by 1,000 by optimizing our app-store listing and creating targeted social media campaigns for three social media platforms: Facebook, Twitter, and Instagram.
                        </Paper>
                    </Container>
                    <Typography sx={styles.pStyle} variant='p'>
                        Safeguarding the achievability of your goal is much easier when you’re the one setting it. However, that’s not always the case. When goals are handed down from elsewhere, make sure to communicate any restraints you may be working under. Even if you can’t shift the end goal, at least you can make your position (and any potential roadblocks) known up-front.
                    </Typography>

                    <Typography sx={styles.headingStyle} variant='h4'>
                        R: Relevant
                    </Typography>
                    <Typography sx={styles.pStyle} variant='p'>
                        Here’s where you need to think about the big picture. Why are you setting the goal that you’re setting?

                        Jane knows that the app is a huge driver of customer loyalty, and that an uptick in their app usage could mean big things for the company’s bottom-line revenue goals. Now she revises her statement to reflect that context.
                    </Typography>
                    <Container>
                        <Paper
                            sx={styles.exampleStyle}
                        >
                            RELEVANT
                            <br />
                            Grow the number of monthly users of Techfirm’s mobile app by 1,000 by optimizing our app-store listing and creating targeted social media campaigns for three social media platforms: Facebook, Twitter, and Instagram. Because mobile users tend to use our product longer, growing our app usage will ultimately increase profitability.
                        </Paper>
                    </Container>

                    <Typography sx={styles.headingStyle} variant='h4'>
                        T: Time-Bound
                    </Typography>
                    <Typography sx={styles.pStyle} variant='p'>
                        To properly measure success, you and your team need to be on the same page about when a goal has been reached. What’s your time horizon? When will the team start creating and implementing the tasks they’ve identified? When will they finish?

                        SMART goals should have time-related parameters built in, so everybody knows how to stay on track within a designated time frame.

                        When Jane incorporates those dates, her SMART goal is complete.
                    </Typography>
                    <Container>
                        <Paper
                            sx={styles.exampleStyle}
                        >
                            TIME-BOUND
                            <br />
                            Grow the number of monthly users of Techfirm’s mobile app by 1,000 within Q1 of 2022. This will be accomplished by optimizing our app-store listing and creating targeted social media campaigns, which will begin running in February 2022, on three social media platforms: Facebook, Twitter, and Instagram. Since mobile is our primary point of conversion for paid-customer signups, growing our app usage will ultimately increase sales.
                        </Paper>
                    </Container>
                    <Typography sx={styles.pStyle} variant='p'>
                        Knowing how to set goals using the SMART framework can help you succeed in setting and attaining goals, no matter how large or small.
                    </Typography>
                </Box>

            </Paper>
        </Container>
        
    )
}

export { SMARTGoals }