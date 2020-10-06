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

//APP default initial state
const initialStateMongo: IAppStateMongo = {
  articles: [
    {
      id: 50,
      title: "Testing title redux",
      description: "1993",
    },
  ],
  isLoading: true,
};

const reducer = (
  state = initialStateMongo,
  action: IAction
): IAppStateMongo => {
  if (action.type === "ADD_ARTICLE") {
    let actualState = state.articles;
    actualState.push(action.payload);
    console.log("Nuevos datos en store:");
    console.log(actualState);
    return {
      ...state,

      articles: [...actualState],
    };
  }

  return state;
};

export default reducer;
