/**
 * Service to generate a clean narration script from the AI briefing.
 */

export const buildNewsNarration = (briefing, userNarrator) => {
  if (!briefing) {
    return {
      title: 'No Data',
      narrationText: 'I am sorry, but I do not have a briefing available right now.',
      segments: [],
    };
  }

  // Build the script
  let narrationText = `Good morning. I am ${userNarrator}. Here is your executive daily briefing. `;
  
  if (briefing.headline) {
    narrationText += `Today's headline: ${briefing.headline}. `;
  }
  
  if (briefing.overview) {
    narrationText += `${briefing.overview}. `;
  }

  const segments = [];
  
  if (briefing.topStories && briefing.topStories.length > 0) {
    narrationText += `Now, let's dive into the top stories. `;
    
    briefing.topStories.forEach((story, index) => {
      let storyText = `Story number ${index + 1}: ${story.title}. `;
      if (story.summary) {
        storyText += `${story.summary}. `;
      }
      if (story.keyTakeaway) {
        storyText += `Key takeaway: ${story.keyTakeaway}. `;
      }
      
      narrationText += storyText;
      
      segments.push({
        storyId: story.storyId,
        text: storyText,
        durationEstimate: storyText.length * 0.05, // Rough estimate 1 char = 50ms
      });
    });
  } else {
    narrationText += 'There are no top stories to report today. ';
  }

  if (briefing.keyInsights && briefing.keyInsights.length > 0) {
    narrationText += `Finally, here are some key insights. `;
    briefing.keyInsights.forEach((insight) => {
      narrationText += `${insight} `;
    });
  }

  narrationText += `That concludes your briefing. Have a great day.`;

  return {
    title: briefing.headline || 'Daily Briefing',
    narrationText,
    segments,
  };
};

export default {
  buildNewsNarration,
};
