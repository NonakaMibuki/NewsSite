import { useState } from "react";
import "./App.css";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from "@chakra-ui/react";
import { HackerNewsAPI } from "./components/HackerNews";
import { CategoryType } from "./types";

function App() {

  const [ tab, setTab ] = useState<CategoryType>(CategoryType.Top);
  return (
    <>
      <h1>NewsSite</h1>

    <Box maxW="1024" m="0 auto">
      <Tabs isFitted variant='enclosed' minW="1024" m="0 auto" mt={50}>
        <TabList>
          <Tab onClick={() => setTab(CategoryType.Top)}>Top</Tab>
          <Tab onClick={() => setTab(CategoryType.New)}>News</Tab>
          <Tab onClick={() => setTab(CategoryType.Best)}>Best</Tab>
        </TabList>
        <TabPanels>
          <TabPanel fontSize={18} mt={30}>
          <HackerNewsAPI tab={tab}/>
          </TabPanel>
          <TabPanel fontSize={18} mt={30}>
          <HackerNewsAPI tab={tab}/>
          </TabPanel>
          <TabPanel fontSize={18} mt={30}>
          <HackerNewsAPI tab={tab}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>

    </>
  );
}

export default App;
