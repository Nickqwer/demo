package nick.umn.demo;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by numnikov on 2/28/15.
 */
public class DevResourcesServlet extends HttpServlet {
    private static final String FILES_LOCATION = "/Users/numnikov/IdeaProjects/demo/src/main/webapp/js";
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.addHeader("content-type", "text/javascript");
        String path = FILES_LOCATION + req.getPathInfo();
        BufferedReader reader = new BufferedReader(new FileReader(new File(path)));
        String line = "";
        while ((line = reader.readLine()) != null) {
            resp.getWriter().write(line + "\n");
        }
    }
}
