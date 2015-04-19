package nick.umn.demo;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;

/**
 * Created by numnikov on 3/2/15.
 */
public class S3ResourceServlet extends HttpServlet {

    private AmazonS3 s3;
    @Override
    public void init(ServletConfig config) throws ServletException {
        ApplicationContext ac = (ApplicationContext) config.getServletContext().getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
        s3 = (AmazonS3) ac.getBean("amazonS3RepositoryService");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String[] pathParts  = req.getPathInfo().substring(1).split("/");
        S3Object object = s3.getObject(new GetObjectRequest(pathParts[0], pathParts[1]));
        BufferedOutputStream output = null;
        try {
            output = new BufferedOutputStream(resp.getOutputStream());
            while (true) {
                byte[] buffer = new byte[8192];
                int result = object.getObjectContent().read(buffer);
                if (result == -1) {
                    break;
                }
                output.write(buffer);
            }
        } finally {
            if (output != null) {
                try {
                    output.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
