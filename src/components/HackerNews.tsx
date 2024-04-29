import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CategoryType } from "../types";

const limit = 10;
const getCategoryUrl = (category: CategoryType): string => {
    switch (category) {
        case "Top":
          return "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
        case "New":
          return "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty";
        case "Best":
          return " https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty";
        default:
          return "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";
      }
};


  // カテゴリに対応したストーリーIDを取得する関数
  const getStoryIds = async (category: CategoryType): Promise<number[]> => {
    const response = await fetch(getCategoryUrl(category));
    return response.json();
  };
  // ストーリーIDの1つ1つを取得する関数
  const getStoryDetails = async (id: number): Promise<ContentsList> => {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    return response.json();
  };
  //10件分を回す
  const getStoriesDetails = async (ids: number[]): Promise<ContentsList[]> => {
    const promises = ids.slice(0, limit).map(id => {
      return getStoryDetails(id);
    });
    // すべての処理が解決するのを待ち、各ストーリーの詳細を表示
    return Promise.all(promises);
  };

//型定義
type ContentsList =
{
    by : string,
    descendants : number,
    id : number,
    kids? : number[],
    score : number,
    time : number,
    title : string,
    url? : string
  }


  
type Props = {
    tab: CategoryType
}

export const HackerNewsAPI = ({tab}: Props) => {

    const [storiesDetails, setStoriesDetails] = useState<ContentsList[] | undefined>();

    useEffect(() => {
        const getStoriesByCategory = async () => {
          try {
            const storyIds = await getStoryIds(tab);
            const storiesDetails = await getStoriesDetails(storyIds);
            console.log(storiesDetails);
            setStoriesDetails(storiesDetails);
          } catch (error) {
            console.error(error);
          } finally {
          }
        };
        getStoriesByCategory();
      }, [tab]);

  return (
    <Box>
        {storiesDetails && storiesDetails.map(story => (
            <Box key={story.id}>
                <Box>
                    {story.title}
                </Box>
            </Box>
        ))}
    </Box>
  )
}

