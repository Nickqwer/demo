package nick.umn.demo;

/**
 * Created by numnikov on 4/24/15.
 */
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.TextMessage;

public class SampleMessageListener implements MessageListener {

    final Logger log = LoggerFactory.getLogger(SampleMessageListener.class);

    public void onMessage(Message message) {
        if (message instanceof TextMessage) {
            try {
                log.info(((TextMessage) message).getText());
            } catch (JMSException ex) {
                throw new RuntimeException(ex);
            }
        } else {
            throw new IllegalArgumentException("Message must be of type TextMessage");
        }
    }
}
