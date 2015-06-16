package nick.umn.demo;

import oracle.jms.AQjmsFactory;
import oracle.jms.AQjmsOracleDebug;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.FactoryBean;

import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.JMSContext;
import javax.jms.JMSException;
import javax.sql.DataSource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

public class OracleAqConnectionFactoryBean implements FactoryBean {

    final Logger log = LoggerFactory.getLogger(OracleAqConnectionFactoryBean.class);

    private DataSource dataSource;

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public void init() throws Exception {
        OutputStream outputStream = new FileOutputStream(new File("/Users/numnikov/log/aq.log"));
        AQjmsOracleDebug.setLogStream(outputStream);
        AQjmsOracleDebug.setTraceLevel(6);
        AQjmsOracleDebug.setDebug(true);
    }

    @Override
    public Object getObject() throws Exception {
        System.out.println("here1");
        log.info("info logger test");
        log.debug("debug logger test");
        final ConnectionFactory connectionFactory = AQjmsFactory.getConnectionFactory(dataSource);
        return new ConnectionFactory() {
            @Override
            public Connection createConnection() throws JMSException {
                System.out.println("here2");
                return connectionFactory.createConnection();
            }

            @Override
            public Connection createConnection(String userName, String password) throws JMSException {
                System.out.println("here3");
                return connectionFactory.createConnection(userName, password);
            }

            @Override
            public JMSContext createContext() {
                return connectionFactory.createContext();
            }

            @Override
            public JMSContext createContext(String userName, String password) {
                return connectionFactory.createContext(userName, password);
            }

            @Override
            public JMSContext createContext(String userName, String password, int sessionMode) {
                return connectionFactory.createContext(userName, password, sessionMode);
            }

            @Override
            public JMSContext createContext(int sessionMode) {
                return connectionFactory.createContext(sessionMode);
            }
        };
    }

    @Override
    public Class<?> getObjectType() {
        return ConnectionFactory.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}

