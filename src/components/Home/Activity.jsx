

class Activity extends Component {

    async componentWillMount() {
        const result = await apiAboutLangjie.fetchRecentActivity({
            page: 1,
            pageSize: 20,
        });
        console.log(result);
    }

    render() {
        return (
            <div>活动</div>
        )
    }
}


export default Activity;