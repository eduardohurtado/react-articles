interface IAppStateMongo {
  articles: {
    _id: string;
    name: string;
    lastName: string;
    gender: string;
    title: string;
    description: string;
  }[];
  isLoading: boolean;
}

interface IAction {
  type: string;
  payload: {
    _id: string;
    name: string;
    lastName: string;
    gender: string;
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

    return {
      articles: [...actualState],
      isLoading: false,
    };
  }

  return state;
};

export default reducer;
