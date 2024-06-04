

const DescriptionsItem = ({ title, content }) => {
    return (
        <div className="item">
            <div className="title">{title}</div>
            <div className="content" style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
        </div>
    )
}
export default DescriptionsItem