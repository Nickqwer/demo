package nick.umn.demo;

import oracle.jms.AQjmsSession;
import org.springframework.beans.factory.FactoryBean;

import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;

public class OracleAqDestinationFactoryBean implements FactoryBean {

    private QueueConnection connection;
    private String queueName;
    private String queueUser;

    public void setConnectionFactory(QueueConnection connection) {
        this.connection = connection;
    }

    public void setQueueName(String queueName) {
        this.queueName = queueName;
    }

    public void setQueueUser(String queueUser) {
        this.queueUser = queueUser;
    }

    @Override
    public Object getObject() throws Exception {
        AQjmsSession session = (AQjmsSession) connection.createQueueSession(true,
                0);
        return session.getQueue(queueUser, queueName);
    }

    @Override
    public Class<?> getObjectType() {
        return Queue.class;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }
}

