interface IAppStateMongo {
  articles: {
    id: number;
    title: string;
    description: string;
  }[];
  isLoading: boolean;
}

interface IAction {
  type: string;
  id: number;
  title: string;
  description: string;
  payload: {
    id: number;
    title: string;
    description: string;
  };
}

const initialStateMongo: IAppStateMongo = {
  articles: [],
  isLoading: true,
};

const reducer = (
  state = initialStateMongo,
  action: IAction
): IAppStateMongo => {
  if (action.type === "ADD_ARTICLE") {
    const actualState = state.articles;
    actualState.push(action.payload);
    console.log("Nuevos datos en store:");
    console.log(actualState);

    return {
      articles: [...actualState],
      isLoading: false,
    };
  }

  return state;
};

export default reducer;
