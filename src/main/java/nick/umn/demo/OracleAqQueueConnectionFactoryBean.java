package nick.umn.demo;

import java.sql.Connection;
import java.sql.SQLException;

import javax.jms.ConnectionFactory;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.sql.DataSource;

import oracle.jdbc.OracleConnection;
import oracle.jms.AQjmsFactory;
import oracle.jms.AQjmsQueueConnectionFactory;

import org.springframework.beans.factory.FactoryBean;
import org.springframework.jdbc.datasource.DataSourceUtils;


public class OracleAqQueueConnectionFactoryBean implements ConnectionFactory {

    private DataSource dataSource;

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

//    @Override
//    public Object getObject() throws Exception {
//        return AQjmsFactory.getQueueConnectionFactory(dataSource);
//        Connection connection = DataSourceUtils.getConnection(dataSource);
//        if (connection.isWrapperFor(OracleConnection.class)) {
//            connection = connection.unwrap(OracleConnection.class);
//        }
//        return AQjmsQueueConnectionFactory.createQueueConnection(dataSource.getConnection());
//    }

//    @Override
//    public Class<?> getObjectType() {
//        return ConnectionFactory.class;
//    }
//
//    @Override
//    public boolean isSingleton() {
//        return true;
//    }

    @Override
    public javax.jms.Connection createConnection() throws JMSException {
        try {
            return AQjmsQueueConnectionFactory.createQueueConnection(dataSource.getConnection());
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public javax.jms.Connection createConnection(String userName, String password) throws JMSException {
        throw new UnsupportedOperationException();
    }

    @Override
    public JMSContext createContext() {
        throw new UnsupportedOperationException();
    }

    @Override
    public JMSContext createContext(String userName, String password) {
        throw new UnsupportedOperationException();
    }

    @Override
    public JMSContext createContext(String userName, String password, int sessionMode) {
        throw new UnsupportedOperationException();
    }

    @Override
    public JMSContext createContext(int sessionMode) {
        throw new UnsupportedOperationException();
    }
}

