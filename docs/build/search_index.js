var documenterSearchIndex = {"docs":
[{"location":"#ThreadPools.jl-Documentation-1","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"","category":"section"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"Improved thread management for background and nonuniform tasks","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"A simple package that creates a few functions mimicked from Base (bgforeach, bgmap, and @bgthreads) that behave like the originals but generate spawned tasks  that stay purely on background threads.  For better throughput with more uniform tasks, fgforeach, fgmap, and  @fgthreads are also provided, and logging versions of all of the  above and the Base.Threads.@threads macro are included for tuning purposes.","category":"page"},{"location":"#Overview-1","page":"ThreadPools.jl Documentation","title":"Overview","text":"","category":"section"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"As of v1.3.1, Julia does not have any built-in mechanisms for keeping  computational threads off of the primary thread.  For many use cases, this  restriction is not important - usually, pure computational activities will  run faster using all threads.  But in some cases, we may want to keep the  primary thread free of blocking tasks.  For example, a GUI running on the  primary thread will become unresponsive if a computational task hits.  For  another, parallel computations with very nonuniform processing times can  benefit from sacrificing the primary thread to manage the loads on the  remaining ones.","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"ThreadPools is a simple package that allows background-only Task assignment for  cases where this makes sense.  The standard foreach,  map, and @threads  functions are mimicked, adding a bg prefix to each to denote background  operation: bgforeach, bgmap, and @bgthreads.   Code that runs with one of  those Base functions should run just fine with the  bg prepended, but adding multithreading for free in the foreach and map  cases, and in all cases keeping the primary thread free of blocking Tasks.","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"When the user would still like to include the primary thread, fg versions of the above functions are provided: fgforeach, fgmap,  and @fgthreads.  These can provide a little more throughput, though there will be occasional interruption of the thread management by the spawned tasks.  Finally, all of the above have a logged counterpart:  ThreadPools.logbgforeach, ThreadPools.logbgmap,  ThreadPools.@logbgthreads, ThreadPools.logfgforeach,  ThreadPools.logfgmap, and ThreadPools.@logfgthreads.","category":"page"},{"location":"#Usage-1","page":"ThreadPools.jl Documentation","title":"Usage","text":"","category":"section"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"Each of the simple API functions can be used like the Base versions of the  same function, with a bg prepended to the function: ","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"julia> bgforeach([1,2,3]) do x\r\n         println(\"\\$(x+1) \\$(Threads.threadid())\")\r\n       end\r\n3 3\r\n4 4\r\n2 2\r\n\r\njulia> bgmap([1,2,3]) do x\r\n         println(\"\\$x \\$(Threads.threadid())\")\r\n         x^2\r\n       end\r\n2 3\r\n3 4\r\n1 2\r\n3-element Array{Int64,1}:\r\n 1\r\n 4\r\n 9\r\n\r\njulia> @bgthreads for x in 1:3\r\n         println(\"\\$x \\$(Threads.threadid())\")\r\n       end\r\n2 3\r\n3 4\r\n1 2","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"For an example of a more complex load-management scenario, see  examples/stackdemo.jl.","category":"page"},{"location":"#Logger-Usage-1","page":"ThreadPools.jl Documentation","title":"Logger Usage","text":"","category":"section"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"The logging versions of the functions take in an IO as the log, or and string that will cause a new file to be created and used by the log.  The readlog and showactivity functions help visualize the activity  (here, a 4-thread  system using the primary with fgforeach):","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"julia> ThreadPools.logfgforeach(x -> sleep(0.1*x), \"log.txt\", 1:8)\r\n\r\njulia> log = ThreadPools.readlog(\"log.txt\")\r\nDict{Int64,Array{ThreadPools.Job,1}} with 4 entries:\r\n  4 => ThreadPools.Job[Job(3, 4, 0.0149999, 0.343), Job(7, 4, 0.343, 1.045)]\r\n  2 => ThreadPools.Job[Job(2, 2, 0.0149999, 0.249), Job(6, 2, 0.249, 0.851)]\r\n  3 => ThreadPools.Job[Job(1, 3, 0.0149999, 0.14), Job(5, 3, 0.14, 0.641)]\r\n  1 => ThreadPools.Job[Job(4, 1, 0.0149999, 0.44), Job(8, 1, 0.44, 1.241)]\r\n\r\njulia> ThreadPools.showactivity(log, 0.1)\r\n0.000   -   -   -   -\r\n0.100   4   2   1   3\r\n0.200   4   2   5   3\r\n0.300   4   6   5   3\r\n0.400   4   6   5   7\r\n0.500   8   6   5   7\r\n0.600   8   6   5   7\r\n0.700   8   6   -   7\r\n0.800   8   6   -   7\r\n0.900   8   -   -   7\r\n1.000   8   -   -   7\r\n1.100   8   -   -   -\r\n1.200   8   -   -   -\r\n1.300   -   -   -   -\r\n1.400   -   -   -   -","category":"page"},{"location":"#Demonstrations-1","page":"ThreadPools.jl Documentation","title":"Demonstrations","text":"","category":"section"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"There are a couple of demonstrations in the examples directory.  demo.jl  shows how jobs are distributed across threads in both the @threads and  @bgthreads cases for various workload distributions.  Running these demos  is fairly simple (results below on 4 threads):","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"julia> include(\"examples/demo.jl\")\r\nMain.Demo\r\n\r\njulia> Demo.run_with_outliers()\r\n\r\n\r\n@bgthreads, Active Job Per Thread on 200ms Intervals\r\n\r\n   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0   0\r\n   0   6  14  25  29  31  31  40  49  52  62  68  73  83  89   0 100 105 109 109 109 109 109 109 132 137 141 147   0   0   0\r\n   0   8  15  20  30  33  33  33  50  57  63  66  66  84  90  94   0 104 108 112 116 121 123 127 131 134 134 134   0   0   0\r\n   0   9  12  24  24  24  35  38   0  56  61  69   0  82  91  95  98  98  98 113 117 120 120 120 120 135 142 146   0   0   0\r\n\r\n\r\n@threads, Active Job Per Thread on 200ms Intervals\r\n\r\n   0   4   6   9  10  12  15  16  20  24  24  24  28  29  31  31  32  33  33  34  37   0   0   0   0   0\r\n   0  43  46  50  52  54  56  60  62  65  66  66  68  70  73   0   0   0   0   0   0   0   0   0   0   0\r\n   0  79  82  84  87  90  92  94  96  98  98  98  98 100 101 104 106 108 109 109 109 109 109 110 112   0\r\n   0 117 119 120 120 120 120 121 124 127 131 133 134 134 134 137 141 143 146 149   0   0   0   0   0   0\r\n\r\nSpeed increase using all threads (ideal 33.3%): 14.4%","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"These demos generate numbered jobs with a randomized work distribution that can  be varied.  There are normal, uniform,  and uniform with 10% outliers of 10x  distributions.  The activity graphs in these demos present time-sliced shapshots  of the thread activities, showing which job number was active in that time  slice.","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"The available demos are:","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"Demo.run_with_uniform()\nDemo.run_with_variation()\nDemo.run_with_outliers()","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"There is also a more complex demo at examples/stackdemo.jl.  Here, the  workload is heirarchal - each jobs produces a result and possibly more jobs.  The primary thread in this case is used purely more managing the job stack.","category":"page"},{"location":"#Simple-API-1","page":"ThreadPools.jl Documentation","title":"Simple API","text":"","category":"section"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"Each function of the simple API tries to mimic an existing function in Base  or Base.Threads to keep any code rework to a minimum.","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"bgforeach(fn, itr)\nbgmap(fn, itr)\n@bgthreads\nfgforeach(fn, itr)\nfgmap(fn, itr)\n@fgthreads","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"bgforeach(fn, itr)\r\nbgmap(fn, itr)\r\n@bgthreads\r\nfgforeach(fn, itr)\r\nfgmap(fn, itr)\r\n@fgthreads","category":"page"},{"location":"#ThreadPools.bgforeach-Tuple{Any,Any}","page":"ThreadPools.jl Documentation","title":"ThreadPools.bgforeach","text":"bgforeach(fn, itrs...) -> Nothing\n\nMimics the  Base.foreach  function, but spawns each iteration to a background thread.  Falls back to  Base.foreach  when nthreads() == 1.\n\nExample\n\njulia> bgforeach([1,2,3]) do x\n    println(\"$(x+1) $(Threads.threadid())\")\n  end\n3 3\n4 4\n2 2\n\nNote that the execution order across the threads is not guaranteed.\n\n\n\n\n\n","category":"method"},{"location":"#ThreadPools.bgmap-Tuple{Any,Any}","page":"ThreadPools.jl Documentation","title":"ThreadPools.bgmap","text":"bgmap(fn, itrs...) -> collection\n\nMimics the  Base.map  function, but spawns each case to a background thread.  Falls back to  Base.map when nthreads() == 1.\n\nNote that the collection(s) supplied must be of equal and finite length.\n\nExample\n\njulia> bgmap([1,2,3]) do x\n         println(\"$x $(Threads.threadid())\")\n         x^2\n       end\n2 3\n3 4\n1 2\n3-element Array{Int64,1}:\n 1\n 4\n 9\n\nNote that while the thread execution order is not guaranteed, the final  result will maintain the proper sequence.\n\n\n\n\n\n","category":"method"},{"location":"#ThreadPools.@bgthreads","page":"ThreadPools.jl Documentation","title":"ThreadPools.@bgthreads","text":"@bgthreads\n\nA macro to parallelize a for-loop to run with multiple threads, preventing use of the primary.  \n\n@bgthreads mimics the  Threads.@threads  macro, but keeps the activity off of the primary thread.  Will fall back  gracefully to Base.foreach behavior when nthreads == 1.\n\nExample\n\njulia> @bgthreads for x in 1:3\n        println(\"$x $(Threads.threadid())\")\n       end\n2 3\n3 4\n1 2\n\nNote that the execution order across the threads is not guaranteed.\n\n\n\n\n\n","category":"macro"},{"location":"#ThreadPools.fgforeach-Tuple{Any,Any}","page":"ThreadPools.jl Documentation","title":"ThreadPools.fgforeach","text":"fgforeach(fn, itrs...) -> Nothing\n\nEquivalent to bgforeach(fn, itrs...), but allows processing on the primary thread.\n\nExample\n\njulia> fgforeach([1,2,3,4,5]) do x\n         println(\"$(x+1) $(Threads.threadid())\")\n       end\n3 1\n2 2\n4 3\n5 4\n6 1\n\nNote that the primary thread was used to process indexes 2 and 5, in this case.\n\n\n\n\n\n","category":"method"},{"location":"#ThreadPools.fgmap-Tuple{Any,Any}","page":"ThreadPools.jl Documentation","title":"ThreadPools.fgmap","text":"fgmap(fn, itrs...) -> collection\n\nEquivalent to bgmap(fn, itrs...), but allows processing on the primary thread.\n\nNote that the collection(s) supplied must be of equal and finite length.\n\nExample\n\njulia> fgmap([1,2,3,4,5]) do x\n         println(\"$x $(Threads.threadid())\")\n         x^2\n       end\n4 4\n1 2\n3 3\n5 4\n2 1\n5-element Array{Int64,1}:\n1\n4\n9\n16\n25\n\nNote that the primary thread was used to process index 2, in this case.\n\n\n\n\n\n","category":"method"},{"location":"#ThreadPools.@fgthreads","page":"ThreadPools.jl Documentation","title":"ThreadPools.@fgthreads","text":"@fgthreads\n\nA macro to parallelize a for-loop to run with multiple threads, allowing use of the primary. \n\nEquivalent to @bgthreads, but allows processing on the primary thread.\n\nExample\n\njulia> @fgthreads for x in 1:5\n    println(\"$x $(Threads.threadid())\")\n   end\n4 3\n1 4\n2 2\n5 3\n3 1\n\nNote that the primary thread was used to process index 3, in this case.\n\n\n\n\n\n","category":"macro"},{"location":"#ThreadPool-API-1","page":"ThreadPools.jl Documentation","title":"ThreadPool API","text":"","category":"section"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"The ThreadPool mimics the Channel{Task} API,  where put!ting a Task causes it to be executed, and take! returns the  completed Task.  The ThreadPool is iterable over the completed Tasks in the same way a Channel would be.","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"ThreadPools.ThreadPool\nBase.put!(pool::ThreadPool, t::Task)\nBase.put!(pool::ThreadPool, fn::Function, args...)\nBase.take!(pool::ThreadPool, ind::Integer)\nBase.close(pool::ThreadPool)\nisactive(pool::ThreadPool)\nresults(pool::ThreadPool)","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"ThreadPools.ThreadPool\r\nBase.put!(pool::ThreadPools.ThreadPool, t::Task)\r\nBase.put!(pool::ThreadPools.ThreadPool, fn::Function, args...)\r\nBase.take!(pool::ThreadPools.ThreadPool)\r\nBase.close(pool::ThreadPools.ThreadPool)\r\nisactive(pool::ThreadPool)\r\nresults(pool::ThreadPool)","category":"page"},{"location":"#ThreadPools.ThreadPool","page":"ThreadPools.jl Documentation","title":"ThreadPools.ThreadPool","text":"ThreadPool(allow_primary=false)\n\nThe main ThreadPool object. Its API mimics that of a Channel{Task}, but each submitted task is executed on a different thread.  If allow_primary is true,  the assigned thread might be the primary, which will interfere with future  thread management for the duration of any heavy-computational (blocking) processes.  If it is false, all assigned threads will be off of the primary. Each thread will only be allowed one Task at a time, but each thread will  backfill with the next queued Task immediately on completion of the previous, without regard to how bust the other threads may be.  \n\n\n\n\n\n","category":"type"},{"location":"#Base.put!-Tuple{ThreadPool,Task}","page":"ThreadPools.jl Documentation","title":"Base.put!","text":"Base.put!(pool::ThreadPool, t::Task)\n\nPut the task t into the pool, blocking until the pool has an available thread.\n\n\n\n\n\n","category":"method"},{"location":"#Base.put!-Tuple{ThreadPool,Function,Vararg{Any,N} where N}","page":"ThreadPools.jl Documentation","title":"Base.put!","text":"Base.put!(pool::ThreadPool, fn::Function, args...)\nBase.put!(fn::Function, pool::ThreadPool, args...)\n\nCreates a task that runs fn(args...) and adds it to the pool, blocking  until the pool has an available thread.\n\n\n\n\n\n","category":"method"},{"location":"#Base.take!-Tuple{ThreadPool}","page":"ThreadPools.jl Documentation","title":"Base.take!","text":"Base.take!(pool::ThreadPool) -> Task\n\nTakes the next available completed task from the pool, blocking until a task is available.  \n\n\n\n\n\n","category":"method"},{"location":"#Base.close-Tuple{ThreadPool}","page":"ThreadPools.jl Documentation","title":"Base.close","text":"Base.close(pool::ThreadPool)\n\nShuts down the pool, closing the internal thread handlers.  It is safe to issue this command after all Tasks have been submitted, regardless of the Task completion status. If issued while the pool is still active, it  will yield until all tasks have been completed. \n\n\n\n\n\n","category":"method"},{"location":"#ThreadPools.isactive-Tuple{ThreadPool}","page":"ThreadPools.jl Documentation","title":"ThreadPools.isactive","text":"ThreadPools.isactive(pool::ThreadPool)\n\nReturns true if there are queued Tasks anywhere in the pool, either awaiting execution, executing, or waiting to be retrieved.\n\n\n\n\n\n","category":"method"},{"location":"#ThreadPools.results-Tuple{ThreadPool}","page":"ThreadPools.jl Documentation","title":"ThreadPools.results","text":"results(pool::ThreadPool) -> result iterator\n\nReturns an iterator over the fetched results of the pooled tasks.\n\nExample\n\njulia> pool = ThreadPool();\n\njulia> @async begin\n         for i in 1:4\n           put!(pool, x -> 2*x, i)\n         end\n         close(pool)\n       end;\n\njulia> for r in results(pool)\n         println(r)\n       end\n6\n2\n4\n8\n\nNote that the execution order across the threads is not guaranteed.\n\n\n\n\n\n","category":"method"},{"location":"#Logging-API-1","page":"ThreadPools.jl Documentation","title":"Logging API","text":"","category":"section"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"For performance tuning, it can be useful to substitute in a logger that can be used to analyze the thread activity.  LoggingThreadPool is provided for this purpose.","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"ThreadPools.logbgforeach\nThreadPools.logbgmap\nThreadPools.@logbgthreads\nThreadPools.logfgforeach\nThreadPools.logfgmap\nThreadPools.@logfgthreads\nThreadPools.@logthreads\nThreadPools.readlog\nThreadPools.showstats\nThreadPools.showactivity\nThreadPools.LoggingThreadPool","category":"page"},{"location":"#","page":"ThreadPools.jl Documentation","title":"ThreadPools.jl Documentation","text":"ThreadPools.logbgforeach\r\nThreadPools.logbgmap\r\nThreadPools.@logbgthreads\r\nThreadPools.logfgforeach\r\nThreadPools.logfgmap\r\nThreadPools.@logfgthreads\r\nThreadPools.@logthreads io\r\nThreadPools.readlog\r\nThreadPools.showstats\r\nThreadPools.showactivity\r\nThreadPools.LoggingThreadPool","category":"page"},{"location":"#ThreadPools.logbgforeach","page":"ThreadPools.jl Documentation","title":"ThreadPools.logbgforeach","text":"ThreadPools.logbgforeach(fn, io, itrs...) -> Nothing\n\nMimics bgforeach, but with a log that can be analyzed with  readlog.  If io is a string, a file will be opened with that name and used as the log.\n\n!! note     This function cannot be used with Threads.nthreads() == 1, and will     throw an error if this is tried.\n\n\n\n\n\n","category":"function"},{"location":"#ThreadPools.logbgmap","page":"ThreadPools.jl Documentation","title":"ThreadPools.logbgmap","text":"ThreadPools.logbgmap(fn, io, itrs...) -> Nothing\n\nMimics bgmap, but with a log that can be analyzed with  readlog.  If io is a string, a file will be opened with that name and used as the log.\n\n!! note     This function cannot be used with Threads.nthreads() == 1, and will     throw an error if this is tried.\n\n\n\n\n\n","category":"function"},{"location":"#ThreadPools.@logbgthreads","page":"ThreadPools.jl Documentation","title":"ThreadPools.@logbgthreads","text":"ThreadPools.@logbgthreads io\n\nMimics @bgthreads, but with a log that can be analyzed with  readlog.  If io is a string, a file will be opened with that name and used as the log.\n\n!! note     This function cannot be used with Threads.nthreads() == 1, and will     throw an error if this is tried.\n\n\n\n\n\n","category":"macro"},{"location":"#ThreadPools.logfgforeach","page":"ThreadPools.jl Documentation","title":"ThreadPools.logfgforeach","text":"ThreadPools.logfgforeach(fn, io, itrs...) -> Nothing\n\nMimics fgforeach, but with a log that can be analyzed with  readlog.  If io is a string, a file will be opened with that name and used as the log.\n\n!! note     This function cannot be used with Threads.nthreads() == 1, and will     throw an error if this is tried.\n\n\n\n\n\n","category":"function"},{"location":"#ThreadPools.logfgmap","page":"ThreadPools.jl Documentation","title":"ThreadPools.logfgmap","text":"ThreadPools.logfgmap(fn, io, itrs...) -> Nothing\n\nMimics fgmap, but with a log that can be analyzed with  readlog.  If io is a string, a file will be opened with that name and used as the log.\n\n!! note     This function cannot be used with Threads.nthreads() == 1, and will     throw an error if this is tried.\n\n\n\n\n\n","category":"function"},{"location":"#ThreadPools.@logfgthreads","page":"ThreadPools.jl Documentation","title":"ThreadPools.@logfgthreads","text":"ThreadPools.@logfgthreads io\n\nMimics @fgthreads, but with a log that can be analyzed with  readlog.  If io is a string, a file will be opened with that name and used as the log.\n\n!! note     This function cannot be used with Threads.nthreads() == 1, and will     throw an error if this is tried.\n\n\n\n\n\n","category":"macro"},{"location":"#ThreadPools.@logthreads-Tuple{Any}","page":"ThreadPools.jl Documentation","title":"ThreadPools.@logthreads","text":"ThreadPools.@logthreads io\n\nMimics  Base.Threads.@threads, but with a log that can be analyzed with readlog to help tune  performance.  If io is a string, a file will be opened with that name and  used as the log.\n\n\n\n\n\n","category":"macro"},{"location":"#ThreadPools.readlog","page":"ThreadPools.jl Documentation","title":"ThreadPools.readlog","text":"ThreadPools.readlog(io) -> Dict of (thread # => job list)\n\nAnalyzes the output of a LoggingThreadPool and produces the history of each job on each thread.  \n\nEach job in the job list is a struct of:\n\nstruct Job\n    id    :: Int\n    tid   :: Int\n    start :: Float64\n    stop  :: Float64\nend\n\nThe default sorting order of the jobs in each thread are by stop time.  io can either be an IO object or a filename. \n\nExample\n\njulia> log = ThreadPools.readlog(\"mylog.txt\")\nDict{Int64,Array{ThreadPools.Job,1}} with 3 entries:\n  4 => ThreadPools.Job[Job(3, 4, 0.016, 0.327), Job(6, 4, 0.327, 0.928)]\n  2 => ThreadPools.Job[Job(2, 2, 0.016, 0.233), Job(5, 2, 0.233, 0.749)]\n  3 => ThreadPools.Job[Job(1, 3, 0.016, 0.139), Job(4, 3, 0.139, 0.546)]\n\n\n\n\n\n","category":"function"},{"location":"#ThreadPools.showstats","page":"ThreadPools.jl Documentation","title":"ThreadPools.showstats","text":"ThreadPools.showstats([io, ]log)\n\nProduces a statistical analysis of the provided log.\n\nExample\n\njulia> T.showstats(\"mylog.txt\")\n\n    Total duration: 1.542 s\n    Number of jobs: 8\n    Average job duration: 0.462 s\n    Minimum job duration: 0.111 s\n    Maximum job duration: 0.82 s\n\n    Thread 2: Duration 1.542 s, Gap time 0.0 s\n    Thread 3: Duration 1.23 s, Gap time 0.0 s\n    Thread 4: Duration 0.925 s, Gap time 0.0 s\n\n\n\n\n\n\n","category":"function"},{"location":"#ThreadPools.showactivity","page":"ThreadPools.jl Documentation","title":"ThreadPools.showactivity","text":"ThreadPools.showactivity([io, ]log, dt, t0=0, t1=Inf; nthreads=Threads.nthreads())\n\nProduces a textual graph of the thread activity in the provided log.\n\nThe format of the output is\n\njulia> ThreadPools.showactivity(\"mylog.txt\", 0.1)\n0.000   -   -   -   -\n0.100   4   2   1   3\n0.200   4   2   5   3\n0.300   4   6   5   3\n0.400   4   6   5   7\n0.500   8   6   5   7\n0.600   8   6   5   7\n0.700   8   6   -   7\n0.800   8   6   -   7\n0.900   8   -   -   7\n1.000   8   -   -   7\n1.100   8   -   -   -\n1.200   8   -   -   -\n1.300   -   -   -   -\n1.400   -   -   -   -\n\nwhere the first column is time, and each column afterwards is the active job id in each thread (threads 1:nthreads, left to right) at that point in time.\n\nIf io is provided, the output will be written there.  log may be a log IO  object, or a filename to be opened and read.  dt is the time step for each row, t0 is the optional starting time, t1 the optional stopping  time, and nthreads is the number of threads to print.\n\n\n\n\n\n","category":"function"},{"location":"#ThreadPools.LoggingThreadPool","page":"ThreadPools.jl Documentation","title":"ThreadPools.LoggingThreadPool","text":"ThreadPools.LoggingThreadPool(io, allow_primary=false)\n\nA ThreadPool that will index and log the start/stop times of each Task put into the pool.  The log format is:\n\n522 3 S 7.932999849319458\n523 4 S 7.932999849319458\n522 3 P 8.823155343098272\n  ^ ^ ^ ^\n  | | | |\n  | | | Time\n  | | S=Start, P=Stop \n  | Thread ID\n Job #\n\nand is parsed by the readlog and showactivity commands.\n\n\n\n\n\n","category":"function"}]
}
