import { Link } from "react-router-dom";
import { Layout, Result, Button } from "antd"; // ~ "shared/ui/{...}"

import { ToggleTask } from "features/toggle-task";
import { TaskCard } from "entities/task";
import styles from "./styles.module.scss";
import * as taskDetailsPageModel from "./model";

type Props = import("react-router-dom").RouteChildrenProps<{
  taskId: string;
}>;

const TaskDetailsPage = ({ match }: Props) => {
  const taskId = Number(match?.params.taskId);
  const { task, isLoading } = taskDetailsPageModel.useTaskDetails(taskId);

  if (!task && !isLoading) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Task was not found"
        extra={
          <Link to="/">
            <Button type="primary">Back to tasks list {taskId}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Layout className={styles.root}>
      <Layout.Content className={styles.content}>
        <TaskCard
          data={task}
          size="default"
          loading={isLoading}
          className={styles.card}
          bodyStyle={{ height: 400 }}
          extra={<Link to="/">Back to TasksList</Link>}
          actions={[<ToggleTask key="toggle" taskId={taskId} />]}
        />
      </Layout.Content>
    </Layout>
  );
};

export default TaskDetailsPage;
